<?php

$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->load();

return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Database configuration
        'db' => [
          'dsn' => getenv('DB_DSN'),
          'user' => getenv('DB_USER'),
          'password' => getenv('DB_PASSWORD'),
          'baseurl' => getenv('DB_BASEURL')
        ],

        'clickhouse' => [
          ['host' => '140.82.39.71', 'port' => '8123', 'protocol' => 'http'],
          ['database' => 'analytics'],
          ['user' => 'z1', 'password' => '7Z0D/8wF']
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
