<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$route = trim($_GET['route'] ?? '', '/');

try {
    if ($method === 'GET' && $route === 'health') {
        jsonResponse(['ok' => true, 'brand' => 'Pavitra Designers', 'service' => 'marketplace-api']);
    }

    if ($method === 'POST' && $route === 'auth/register') {
        $body = requestBody();
        $name = trim((string) ($body['name'] ?? ''));
        $email = filter_var($body['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $password = (string) ($body['password'] ?? '');
        $role = in_array($body['role'] ?? 'retailer', ['seller', 'retailer'], true) ? $body['role'] : 'retailer';
        if ($name === '' || !$email || strlen($password) < 8) jsonResponse(['error' => 'Name, valid email and an 8-character password are required.'], 422);
        $pdo = database();
        $check = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $check->execute([$email]);
        if ($check->fetch()) jsonResponse(['error' => 'An account with this email already exists.'], 409);
        $insert = $pdo->prepare('INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, "active")');
        $insert->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), $role]);
        jsonResponse(['message' => 'Account created successfully. Please sign in.'], 201);
    }

    if ($method === 'POST' && $route === 'auth/login') {
        $body = requestBody();
        $email = filter_var($body['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $password = (string) ($body['password'] ?? '');
        $stmt = database()->prepare('SELECT id, name, email, password_hash, role, status FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if (!$user || $user['status'] !== 'active' || !password_verify($password, $user['password_hash'])) jsonResponse(['error' => 'Invalid email or password.'], 401);
        $token = bin2hex(random_bytes(32));
        $save = database()->prepare('INSERT INTO api_tokens (user_id, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))');
        $save->execute([$user['id'], hash('sha256', $token)]);
        unset($user['password_hash']);
        jsonResponse(['token' => $token, 'user' => $user]);
    }

    if ($method === 'GET' && $route === 'products') {
        $stmt = database()->query('SELECT p.id, p.name, p.slug, p.retail_price, p.bulk_price, p.moq, p.stock, p.image_url, c.name AS category FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.status = "active" ORDER BY p.created_at DESC LIMIT 48');
        jsonResponse(['data' => $stmt->fetchAll()]);
    }

    jsonResponse(['error' => 'Route not found.'], 404);
} catch (Throwable $error) {
    error_log('[Pavitra API] ' . $error->getMessage());
    jsonResponse(['error' => 'An unexpected error occurred.'], 500);
}
