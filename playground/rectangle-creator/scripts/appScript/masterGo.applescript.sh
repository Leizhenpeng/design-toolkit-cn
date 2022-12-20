#!/usr/bin/env bash
osascript <<'EOF'
tell application "MasterGo" to activate
tell application "System Events" to tell process "MasterGo"
    keystroke "p" using {command down, option down}
end tell
EOF




