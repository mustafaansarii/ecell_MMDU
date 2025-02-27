# Generated by Django 5.1.6 on 2025-02-23 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_alter_joinecellregistration_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joinecellregistration',
            name='contact_number',
            field=models.CharField(blank=True, max_length=15, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='course_branch',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='field_of_interest',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='full_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='has_experience',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='has_startup_ideas',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='motivation',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='role_preference',
            field=models.CharField(blank=True, choices=[('domain_leader', 'Domain Leader'), ('management_team', 'Management Team')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='roll_number',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='team_work_comfort',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='time_commitment',
            field=models.CharField(blank=True, choices=[('1-3', '1-3 hours per week'), ('4-6', '4-6 hours per week'), ('7+', '7+ hours per week')], max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='value_proposition',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='joinecellregistration',
            name='year_of_study',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
