# Generated by Django 3.2.9 on 2021-11-25 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20211125_2017'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='topics',
        ),
        migrations.AddField(
            model_name='company',
            name='topics',
            field=models.ManyToManyField(to='main.Topic', verbose_name='Интересующие направления'),
        ),
        migrations.RemoveField(
            model_name='freelancer',
            name='topics',
        ),
        migrations.AddField(
            model_name='freelancer',
            name='topics',
            field=models.ManyToManyField(to='main.Topic', verbose_name='Интересующие направления'),
        ),
    ]
