#!/usr/bin/env bash
osascript <<'EOF'
tell application "MasterGo" to activate
tell application "System Events" to tell process "MasterGo"
   click menu item "Rectangle Creator" of menu "开发者模式" of menu item "开发者模式" of menu "插件" of menu bar item "插件" of menu bar 1
end tell
EOF




