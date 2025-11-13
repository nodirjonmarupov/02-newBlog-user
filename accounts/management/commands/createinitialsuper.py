from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Creates an initial superuser if one does not exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        
        # Bu yerda 'nodirjon' o'rniga o'zingizning admin nomingizni yozishingiz mumkin
        username = 'nodirjon'
        email = 'nodirjonmarupov850@gmail.com' # Buni o'zgartirishingiz mumkin
        password = '2002nm2002' # BU YERGA O'Z PAROLINGIZNI YOZING

        if not User.objects.filter(username=username).exists():
            self.stdout.write(f'Creating new superuser: {username}')
            User.objects.create_superuser(username, email, password)
        else:
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))