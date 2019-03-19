# Generated by Django 2.0.2 on 2019-02-20 14:17

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='user_body',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('key', models.CharField(blank=True, max_length=200)),
                ('value', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='user_header',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('key', models.CharField(blank=True, max_length=200)),
                ('value', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='user_host',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('host', models.CharField(max_length=200)),
                ('create_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('response_body', models.TextField(default='ZZZ', max_length=200)),
                ('request_body', models.TextField(blank=True, default='', max_length=200)),
                ('userid', models.IntegerField()),
                ('type', models.CharField(default='post', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='user_header',
            name='host',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='one.user_host'),
        ),
        migrations.AddField(
            model_name='user_body',
            name='host',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='one.user_host'),
        ),
    ]
