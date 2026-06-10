TARGET_DIR="$HOME/deinop-game"
mkdir -p "$TARGET_DIR"

echo "Створення папки програми у $TARGET_DIR..."

echo "Завантаження компонентів гри Deinop..."
wget -O "$TARGET_DIR/Deinop.x86_64" "https://github.com/KuzhenLarn/KuzhenProject/raw/main/project/deinop/settings/Deinop.x86_64"
wget -O "$TARGET_DIR/icon.png" "https://github.com/KuzhenLarn/KuzhenProject/raw/main/img/Deinop_ico.png"

chmod +x "$TARGET_DIR/Deinop.x86_64"

DESKTOP_PATH="$HOME/Стільниця/Deinop.desktop"

if [ ! -d "$HOME/Стільниця" ]; then
    DESKTOP_PATH="$HOME/Desktop/Deinop.desktop"
fi

cat <<EOF > "$DESKTOP_PATH"
[Desktop Entry]
Type=Application
Name=Deinop
Name[uk]=Дейноп
Comment=Kuzhen Project Game Launcher
Exec=$TARGET_DIR/Deinop.x86_64
Icon=$TARGET_DIR/icon.png
Terminal=false
Categories=Game;
EOF

chmod +x "$DESKTOP_PATH"

rm -- "$0"
