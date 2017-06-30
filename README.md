Выполните команду:
```sh
docker build --tag name_image .
```
Это создаст и настроит образ с сайтом со всеми зависимостями.

После вы должны запустить контейнер:
```sh
docker run -p 80:80 --name name_container -d name_image
```
Далее необходимо выполнить миграции базы данных. Для этого зайдите в терминал контейнера:
```sh
docker exec -it id_container bash
```
Перейдите в директорию с сайтом:
```sh
cd /var/www/shop
```
И выполните миграцию:
```sh
php artisan migrate
php artisan db:seed
```
Все готово! Если вы делали это на домашнем компьютере, то по адресу localhost попадете на сайт. На серверной машине по ip адресу выданного вам при покупке для удаленного доступа.
