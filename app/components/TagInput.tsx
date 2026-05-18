"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import apiService, { TagSnapshot } from "../service/api";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  value,
  onChange,
  placeholder = "Add tags...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<TagSnapshot[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const results = await apiService.searchTags(query);

        // Filter out already selected tags
        setSuggestions(
          results.filter((tag: TagSnapshot) => !value.includes(tag.name)),
        );
      } catch (error) {
        console.error("Error fetching tag suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [value],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        fetchSuggestions(inputValue);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, fetchSuggestions]);

  useEffect(() => {
    // Clear suggestions if input is empty
    if (!inputValue) {
      setSuggestions([]);
    }
  }, [inputValue]);

  const addTag = (tagName: string) => {
    const trimmedTag = tagName.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
    }
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        addTag(suggestions[selectedIndex].name);
      } else {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors min-h-[42px]">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-blue-900 focus:outline-none"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          autoComplete="off"
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 min-w-[120px] py-0.5"
          placeholder={value.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500 text-xs flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-3 w-3 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </div>
          ) : (
            suggestions.map((tag, index) => (
              <div
                key={tag.id}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => addTag(tag.name)}
              >
                {tag.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
