<?php

class Auth
{
  public function __construct($config)
  {
    try {
      $this->db = new PDO($config['dsn'], $config['user'], $config['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
  }

  private function findAccount($login)
  {
    $sql = 'SELECT * FROM accounts WHERE login = :login';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['login' => $login]);
    return $sth->fetch(PDO::FETCH_ASSOC);
  }

  private function findToken($token)
  {
    $sql = 'SELECT * FROM tokens WHERE token = :token';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['token' => $token]);
    return $sth->fetch(PDO::FETCH_ASSOC);
  }

  private function clearTokens()
  {
    $sql = 'DELETE FROM tokens WHERE created < :expired';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['expired' => time() - 86400]);
  }

  private function saveToken($token, $created, $account)
  {
    $sql = 'INSERT INTO tokens VALUE (:token, :created, :account)';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute([
      'token' => $token,
      'created' => $created,
      'account' => $account
    ]);
  }

  private function generateToken() {
    return str_replace(['+', '/'], '0', base64_encode(random_bytes(30)));
  }

  public function login($login, $password)
  {
    $account = $this->findAccount($login);
    if ($account) {
      if (password_verify($password, $account['hash'])) {
        $token = $this->generateToken();
        $this->clearTokens();
        $this->saveToken($token, time(), $login);
        return $token;
      } else {
        return 'none';
      }
    }
    return false;
  }

  public function verifyToken($token)
  {
    $tokenInfo = $this->findToken($token);
    if ($tokenInfo) {
      return $tokenInfo['created'] > time() - 86400 ?
        $this->findAccount($tokenInfo['account']) : false;
    }
    return false;
  }
}
