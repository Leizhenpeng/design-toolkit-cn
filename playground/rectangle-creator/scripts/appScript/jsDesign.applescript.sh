#!/usr/bin/env bash
osascript <<'EOF'
tell application "即时设计" to activate
tell application "System Events" to tell process "即时设计"
    keystroke "p" using {command down, option down}
end tell
EOF
