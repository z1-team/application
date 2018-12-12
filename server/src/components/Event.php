<?php

function withNull($value) {
  return strcmp($value, 'NULL') === 0 ? NULL : $value;
}

class Event
{
  private static $utm = [
    'utm_term' => 'utmTerm',
    'utm_source' => 'utmSource',
    'utm_medium' => 'utmMedium',
    'utm_campaign' => 'utmCampaign',
    'utm_content' => 'utmContent',
    'utm_gbid' => 'utmGbId',
    'utm_phrase' => 'utmPhrase',
    'utm_gender' => 'utmGender',
    'utm_age' => 'utmAge'
  ];
  private $default;
  private $request;

  private static function mapUtmKeys($key) {
    return isset(self::$utm[$key]) ? self::$utm[$key] : $key;
  }

  private function getField($field)
  {
    return isset($this->request[$field]) ?
      withNull($this->request[$field]) : $this->default[$field];
  }

  private function getPayload()
  {
    return json_decode($this->getField('payload'), true);
  }

  public function __construct($request)
  {
    $this->default = [
      'utm_source' => NULL,
      'utm_campaign' => NULL,
      'client_id' => NULL,
      'yclick_id' => NULL,
      'user_id' => NULL,
      'type' => 'event_none',
      'date' => date('Y-m-d'),
      'datetime' => date('Y-m-d H:i:s'),
      'localtime' => date('Y-m-d H:i:s'),
      'payload' => '{}',
      'user_ip' => NULL,
      'user_region' => NULL,
      'user_city' => NULL,
      'user_country' => NULL,
      'browser' => NULL
    ];
    $this->request = $request;
  }

  public function name()
  {
    return $this->getField('type');
  }

  public function yClickId()
  {
    return $this->getField('yclick_id');
  }

  public function clientId()
  {
    return $this->getField('client_id');
  }

  public function utmCampaign()
  {
    return $this->getField('utm_campaign');
  }

  public function browserInfo()
  {
    $info = $this->getField('browser');
    if ($info !== NULL) {
      $browser = json_decode($info, true);
      return [
        'browserName' => $browser['name'],
        'browserVersion' => $browser['version'],
        'browserOS' => $browser['os']
      ];
    }
    return NULL;
  }

  public function utmExtraKeys()
  {
    $utmSource = $this->getField('utm_source');
    $utmParams = array_intersect_key($this->getPayload(), self::$utm);
    if ($utmSource !== NULL) {
      $utmParams['utm_source'] = $this->getField('utm_source');
    }
    return array_map(['Event', 'mapUtmKeys'], array_keys($utmParams));
  }

  public function utmExtraValues()
  {
    $utmSource = $this->getField('utm_source');
    $utmParams = array_intersect_key($this->getPayload(), self::$utm);
    if ($utmSource !== NULL) {
      $utmParams['utm_source'] = $this->getField('utm_source');
    }
    return array_values($utmParams);
  }

  public function eventExtraKeys()
  {
    $otherParams = array_diff_key($this->getPayload(), self::$utm);
    return array_keys($otherParams);
  }

  public function eventExtraValues()
  {
    $otherParams = array_diff_key($this->getPayload(), self::$utm);
    return array_values($otherParams);
  }

  public function extraData()
  {
    $extra = [];
    $userId = $this->getField('user_id');
    if ($userId !== NULL) {
      $extra['userId'] = $userId;
    }
    $userCountry = $this->getField('user_country');
    if ($userCountry !== NULL) {
      $extra['userCountry'] = $userCountry;
    }
    $browser = $this->browserInfo();
    if ($browser !== NULL) {
      $extra = array_merge($extra, $browser);
    }
    return $extra;
  }

  public function extraKeys()
  {
    return array_keys($this->extraData());
  }

  public function extraValues()
  {
    return array_values($this->extraData());
  }

  public function date()
  {
    return $this->getField('date');
  }

  public function dateTime()
  {
    return $this->getField('datetime');
  }

  public function userIP()
  {
    return $_SERVER['REMOTE_ADDR'];
  }

  public function userRegion()
  {
    return $this->getField('user_region');
  }

  public function userCity()
  {
    return  $this->getField('user_city');
  }

  public function userLocalTime()
  {
    return $this->getField('localtime');
  }
}
