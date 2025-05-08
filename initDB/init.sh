# расшифровка скрипта инициализации базы (с запросом ключа)
gpg -o init_decrypted.js -d init.js.gpg

# загрузка расшифрованного скрипта в базу
mongosh < init_decrypted.js
