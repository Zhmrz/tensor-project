# Generated by Django 3.2.9 on 2021-11-29 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20211129_2007'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='publication_date',
            field=models.DateField(auto_now=True, verbose_name='Время публикации'),
        ),
        migrations.AddField(
            model_name='respondingfreelancers',
            name='responding_date',
            field=models.DateField(auto_now=True, verbose_name='Время отклика'),
        ),
    ]
