<?php

// set your api-key
$key = 'YOUR API KEY';

// set your name
$name = 'YOUR NAME';

// Get query from form GET
$query = $_GET['query'];

//build curl url
$offset = 0;
$lang = 'en';
$format = 'json';
$url = 'https://api.qmeta.net/conn.php?key='.$key.'&query='.$query.'&offset='.$offset.'&lang='.$lang.'&format='.$format;

// run curl with options
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $url,
    CURLOPT_USERAGENT => $name
));
$resp = curl_exec($curl);
curl_close($curl);
$output = json_decode($resp, true);

//output results as foreach
?>
<ol>
<?php
foreach ($output['results']['list'] as $item){
  ?>
  <li>
    <a href="<?php echo $item['link']; ?>"><img src="<?php echo $item['favicon']; ?>" width="20px"/> <?php echo $item['title']; ?></a>
    <br/>
    <p><?php echo $item['description']; ?></p>
  </li>
  <?php
}
?>
</ol>
