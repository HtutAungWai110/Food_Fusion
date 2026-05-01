<?php

namespace Database\Seeders;

use App\Models\EducationalResource;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EducationalResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default user if none exists
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'id' => Str::uuid()->toString(),
                'firstname' => 'Admin',
                'lastname' => 'User',
                'email' => 'admin@foodfusion.com',
                'password' => bcrypt('password'),
            ]);
        }

        $resources = [
            [
                'title' => 'Biomass Energy',
                'description' => 'An introduction to biomass energy and its role in renewable energy systems.',
                'image_path' => 'renewable_energy/BiomassEnergy.png',
                'file_path' => 'renewable_energy/BiomassEnergy.pdf',
            ],
            [
                'title' => 'Renewable Energy and Climate Change - Chapter 1',
                'description' => 'First chapter exploring the relationship between renewable energy and climate change mitigation.',
                'image_path' => 'renewable_energy/Chapter-1-Renewable-Energy-and-Climate-Change-1.png',
                'file_path' => 'renewable_energy/Chapter-1-Renewable-Energy-and-Climate-Change-1.pdf',
            ],
            [
                'title' => 'Water for Energy',
                'description' => 'World Energy Council publication on the interconnection between water resources and energy production.',
                'image_path' => 'renewable_energy/PUB_Water_For_Energy_2010_WEC.png',
                'file_path' => 'renewable_energy/PUB_Water_For_Energy_2010_WEC.pdf',
            ],
            [
                'title' => 'Solar Energy Timeline',
                'description' => 'Historical timeline and development of solar energy technology and adoption.',
                'image_path' => 'renewable_energy/solar_timeline.png',
                'file_path' => 'renewable_energy/solar_timeline.pdf',
            ],
            [
                'title' => 'Marine Energy',
                'description' => 'World Energy Resources report on marine and ocean energy potential.',
                'image_path' => 'renewable_energy/WER_2013_11_Marine_Energy.png',
                'file_path' => 'renewable_energy/WER_2013_11_Marine_Energy.pdf',
            ],
            [
                'title' => 'Wind Energy',
                'description' => 'Comprehensive overview of wind energy technology, applications, and global trends.',
                'image_path' => 'renewable_energy/WIND ENERGY.png',
                'file_path' => 'renewable_energy/WIND ENERGY.pdf',
            ],
        ];

        foreach ($resources as $resource) {
            EducationalResource::create([
                'id' => Str::uuid()->toString(),
                'user_id' => $user->id,
                'title' => $resource['title'],
                'description' => $resource['description'],
                'image_path' => $resource['image_path'],
                'file_path' => $resource['file_path'],
            ]);
        }

        $this->command->info('6 educational resources seeded successfully!');
    }
}
