<?php

class ClientsStorage
{
  private $client;
  private $db;

  public function __construct($db, $client)
  {
    $this->client = $client;
    $this->db = $db;
  }

  private function groupsWeights($test)
  {
    $clients = 'SELECT COUNT(*) FROM ab_clients WHERE test_name = ? AND group_name = ab_groups.name';
    $sql = "SELECT name, ($clients) AS amount FROM ab_groups WHERE test = ?";
    $sth = $this->db->prepare($sql);
    $sth->execute([$test, $test]);
    return $sth->fetchAll(PDO::FETCH_ASSOC);
  }

  private function findLightest($groups)
  {
    $lightestValue = $groups[0]['amount'];
    $lightest = $groups[0]['name'];
    foreach ($groups as $group) {
      if ($group['amount'] < $lightestValue) {
        $lightestValue = $group['amount'];
        $lightest = $group['name'];
      }
    }
    return $lightest;
  }

  public function assignValue($test, $group, $extra)
  {
    if (strcmp($test, 'bannerPictures') === 0 && $extra['banner'] !== NULL) {
      if (strcmp($group, 'g0') === 0) {
        return $extra['banner'];
      } else {
        $static = ['bg11', 'bg12'];
        return $static[random_int(0, 1)];
      }
    } else {
      return false;
    }
  }

  public function findValue($value)
  {
    $sql = 'SELECT value FROM ab_values WHERE id = ?';
    $sth = $this->db->prepare($sql);
    $sth->execute([$value]);
    return $sth->fetchColumn();
  }

  public function saveClient($client)
  {
    $sql = 'INSERT INTO ab_clients VALUE (?, ?, ?, ?)';
    $sth = $this->db->prepare($sql);
    $sth->execute([
      $client['id'],
      $client['test'],
      $client['group'],
      $client['value']
    ]);
    $this->client->writeRows('insert into analytics.abtest', [[
      'TestName' => $client['test'],
      'Group' => $client['group'],
      'ClientId' => $client['id'],
      'EventDate' => date('Y-m-d'),
      'EventDateTime' => date('Y-m-d H:i:s'),
      'ExtraKeys' => ['banner_id'],
      'ExtraValues' => [$client['value']]
    ]]);
  }

  public function assignGroup($client, $test, $extra)
  {
    $groups = $this->groupsWeights($test);
    if ($groups) {
      $group = $this->findLightest($groups);
      $value = $this->assignValue($test, $group, $extra);
      if ($value) {
        $this->saveClient([
          'id' => $client,
          'test' => $test,
          'group' => $group,
          'value' => $value
        ]);
        return $this->findValue($value);
      }
      return false;
    } else {
      return 'assign_error';
    }
  }

  public function testParams($client, $tests, $extra)
  {
    $valueId = 'SELECT value FROM ab_clients WHERE test_name = ? AND client_id = ?';
    $sql = "SELECT value FROM ab_values WHERE id = ($valueId)";
    $sth = $this->db->prepare($sql);
    $params = [];
    foreach ($tests as $testRecord) {
      $test = $testRecord['name'];
      $sth->execute([$test, $client]);
      if ($value = $sth->fetchColumn()) {
        $params[$test] = $value;
      } else {
        $params[$test] = $this->assignGroup($client, $test, $extra);
      }
    }
    return $params;
  }
}
