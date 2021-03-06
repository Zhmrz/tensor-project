# Generated by Django 3.2.9 on 2021-12-01 08:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_auto_20211129_2009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='performer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_performer', to='main.freelancer', verbose_name='Исполнитель заказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='publication_date',
            field=models.DateField(verbose_name='Время публикации'),
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed_order', models.FileField(upload_to='', verbose_name='Прикрепленная работа')),
                ('sum', models.DecimalField(decimal_places=2, max_digits=9, verbose_name='Сумма заказа')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.company', verbose_name='Компания')),
                ('freelancer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.freelancer', verbose_name='Фрилансер')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.order', verbose_name='Заказ')),
            ],
        ),
    ]
