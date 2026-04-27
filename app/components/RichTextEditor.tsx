"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: string;
}

type HeadingTag = "P" | "H1" | "H2" | "H3" | "H4";

const HEADING_OPTIONS: { value: HeadingTag; label: string }[] = [
    { value: "P", label: "Normal" },
    { value: "H1", label: "Heading 1" },
    { value: "H2", label: "Heading 2" },
    { value: "H3", label: "Heading 3" },
    { value: "H4", label: "Heading 4" },
];

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Mulai menulis di sini...",
    minHeight = "300px",
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const [currentBlock, setCurrentBlock] = useState<HeadingTag>("P");
    const [showHeadingMenu, setShowHeadingMenu] = useState(false);
    const [showAlignMenu, setShowAlignMenu] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    // Sync external value on mount only
    useEffect(() => {
        if (editorRef.current && value && !editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value;
            setIsEmpty(false);
        }
    }, [value]);

    const exec = useCallback((command: string, val?: string) => {
        document.execCommand(command, false, val);
        editorRef.current?.focus();
        updateActiveFormats();
    }, []);

    const updateActiveFormats = useCallback(() => {
        const formats = new Set<string>();
        if (document.queryCommandState("bold")) formats.add("bold");
        if (document.queryCommandState("italic")) formats.add("italic");
        if (document.queryCommandState("underline")) formats.add("underline");
        if (document.queryCommandState("strikeThrough")) formats.add("strikeThrough");
        if (document.queryCommandState("insertUnorderedList")) formats.add("ul");
        if (document.queryCommandState("insertOrderedList")) formats.add("ol");

        // Detect current block type
        const block = document.queryCommandValue("formatBlock") || "p";
        const normalized = block.replace(/<\/?/g, "").toUpperCase() as HeadingTag;
        if (["H1", "H2", "H3", "H4", "P"].includes(normalized)) {
            setCurrentBlock(normalized);
        } else {
            setCurrentBlock("P");
        }

        // Detect alignment
        if (document.queryCommandState("justifyLeft")) formats.add("alignLeft");
        if (document.queryCommandState("justifyCenter")) formats.add("alignCenter");
        if (document.queryCommandState("justifyRight")) formats.add("alignRight");
        if (document.queryCommandState("justifyFull")) formats.add("alignJustify");

        setActiveFormats(formats);
    }, []);

    const handleInput = useCallback(() => {
        const html = editorRef.current?.innerHTML || "";
        const text = editorRef.current?.innerText?.trim() || "";
        setIsEmpty(text.length === 0);
        onChange(html);
        updateActiveFormats();
    }, [onChange, updateActiveFormats]);

    const handleKeyUp = useCallback(() => {
        updateActiveFormats();
    }, [updateActiveFormats]);

    const handleMouseUp = useCallback(() => {
        updateActiveFormats();
    }, [updateActiveFormats]);

    const setHeading = useCallback(
        (tag: HeadingTag) => {
            if (tag === "P") {
                exec("formatBlock", "<p>");
            } else {
                exec("formatBlock", `<${tag.toLowerCase()}>`);
            }
            setCurrentBlock(tag);
            setShowHeadingMenu(false);
        },
        [exec]
    );

    const fmtBtnClass = (id: string) =>
        `px-1.5 py-1 rounded cursor-pointer select-none transition-colors ${activeFormats.has(id)
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`;

    const currentLabel = HEADING_OPTIONS.find((h) => h.value === currentBlock)?.label || "Normal";

    return (
        <div className="border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
            {/* ── Toolbar ── */}
            <div
                className="border-b border-gray-200 px-3 py-1.5 flex items-center gap-1 text-xs bg-gray-50/80 flex-wrap"
                onMouseDown={(e) => e.preventDefault()} // prevent stealing focus
            >
                {/* Block Format Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-blue-600 font-medium transition-colors"
                        onClick={() => {
                            setShowHeadingMenu((p) => !p);
                            setShowAlignMenu(false);
                        }}
                    >
                        {currentLabel}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showHeadingMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[140px]">
                            {HEADING_OPTIONS.map((h) => (
                                <button
                                    key={h.value}
                                    type="button"
                                    className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors ${currentBlock === h.value ? "text-blue-600 font-medium bg-blue-50" : "text-gray-700"
                                        }`}
                                    onClick={() => setHeading(h.value)}
                                >
                                    {h.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Divider />

                {/* Inline Formatting */}
                <button type="button" className={`${fmtBtnClass("bold")} font-bold`} onClick={() => exec("bold")} title="Bold">
                    B
                </button>
                <button type="button" className={`${fmtBtnClass("italic")} italic`} onClick={() => exec("italic")} title="Italic">
                    I
                </button>
                <button type="button" className={`${fmtBtnClass("underline")} underline`} onClick={() => exec("underline")} title="Underline">
                    U
                </button>
                <button type="button" className={`${fmtBtnClass("strikeThrough")} line-through`} onClick={() => exec("strikeThrough")} title="Strikethrough">
                    S
                </button>

                <Divider />

                {/* Alignment Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                        onClick={() => {
                            setShowAlignMenu((p) => !p);
                            setShowHeadingMenu(false);
                        }}
                        title="Alignment"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
                        </svg>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showAlignMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[130px]">
                            {(
                                [
                                    ["justifyLeft", "Align Left", "M4 6h16M4 12h10M4 18h16"],
                                    ["justifyCenter", "Center", "M4 6h16M4 12h12M4 18h16"],
                                    ["justifyRight", "Align Right", "M4 6h16M14 12h6M4 18h16"],
                                    ["justifyFull", "Justify", "M4 6h16M4 12h16M4 18h16"],
                                ] as const
                            ).map(([cmd, label, path]) => (
                                <button
                                    key={cmd}
                                    type="button"
                                    className="flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                                    onClick={() => {
                                        exec(cmd);
                                        setShowAlignMenu(false);
                                    }}
                                >
                                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                                    </svg>
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Divider />

                {/* Lists */}
                <button type="button" className={fmtBtnClass("ul")} onClick={() => exec("insertUnorderedList")} title="Bullet List">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <button type="button" className={fmtBtnClass("ol")} onClick={() => exec("insertOrderedList")} title="Numbered List">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                    </svg>
                </button>

                <Divider />

                {/* Link */}
                <button
                    type="button"
                    className="px-1.5 py-1 rounded cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={() => {
                        const url = prompt("Masukkan URL:");
                        if (url) exec("createLink", url);
                    }}
                    title="Insert Link"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </button>

                {/* Horizontal Rule */}
                <button
                    type="button"
                    className="px-1.5 py-1 rounded cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={() => exec("insertHorizontalRule")}
                    title="Horizontal Line"
                >
                    <span className="font-medium">—</span>
                </button>

                {/* Clear Formatting */}
                <button
                    type="button"
                    className="px-1.5 py-1 rounded cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-red-500 transition-colors ml-auto"
                    onClick={() => exec("removeFormat")}
                    title="Clear Formatting"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* ── Editable Area ── */}
            <div className="relative">
                {isEmpty && (
                    <div className="absolute top-4 left-4 text-gray-400 text-sm pointer-events-none select-none">
                        {placeholder}
                    </div>
                )}
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full p-4 text-gray-900 leading-relaxed text-sm outline-none prose prose-sm max-w-none"
                    style={{ minHeight }}
                    onInput={handleInput}
                    onKeyUp={handleKeyUp}
                    onMouseUp={handleMouseUp}
                    onClick={() => {
                        setShowHeadingMenu(false);
                        setShowAlignMenu(false);
                    }}
                />
            </div>
        </div>
    );
}

function Divider() {
    return <div className="h-5 w-px bg-gray-300 mx-0.5" />;
}
