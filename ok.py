#!/usr/bin/env python3
import os

# Configuration
OUTPUT_FILE = 'all_files_dump.txt'
# Directories or files to skip (relative to script directory)
EXCLUDE = {
    '.git',
    '__pycache__',
    'node_modules',
    '.idea',
    OUTPUT_FILE,
    os.path.basename(__file__)
}
# File extensions to skip (images, binary blobs)
IMAGE_EXTS = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', ".ico", ".css", ".scss", ".lock"}


def should_exclude(path, exclude_set):
    # Exclude if any part of the path matches an exclude name
    parts = set(os.path.normpath(path).split(os.sep))
    return bool(parts & exclude_set)


def main():
    # Operate from the script's own directory
    root_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(root_dir, OUTPUT_FILE)

    with open(out_path, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(root_dir):
            # Remove excluded directories from traversal
            dirs[:] = [d for d in dirs if d not in EXCLUDE]

            for filename in files:
                # Skip excluded files and image files by extension
                rel_path = os.path.relpath(os.path.join(root, filename), root_dir)
                ext = os.path.splitext(filename)[1].lower()
                if should_exclude(rel_path, EXCLUDE) or ext in IMAGE_EXTS:
                    continue

                file_path = os.path.join(root, filename)
                out.write(f"=== {rel_path} ===\n")
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                        out.write(f.read())
                except Exception as e:
                    out.write(f"[Error reading {rel_path}: {e}]\n")
                out.write("\n\n")

    print(f"All files concatenated into '{out_path}'")


if __name__ == '__main__':
    main()
