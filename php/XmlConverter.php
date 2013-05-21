<?php
require_once('mailer/class.phpmailer.php');

if (isset($_POST['userID'])) {
	$id= $_POST['userID'];
	xmlCon($id);
}
//header('Content-type: application/xml');
function xmlCon($userID) {		

//$userID= '5184155fb0917a2c0a000014';
include 'database.php';

$json = $collection->findOne(array("_id" => new MongoId($userID)));


$json = json_encode($json);
var_dump($json);

$obj = json_decode($json);
//echo $obj;
$new =  SerializeAsXML($obj);

$my_file = 'medRep/'.$userID.'.xml';
$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);

fwrite($handle,  '<stdClass>'.$new.'</stdClass>');

sendMail($userID);

//echo '<stdClass>'.$new.'</stdClass>';

//mail_attachment($my_file,"","nhm919@hotmail.com","chi@ahleeen.com","Nasser","alminji@gmail.com","Results","Hello there");

// function mail_attachment($filename, $path, $mailto, $from_mail, $from_name, $replyto, $subject, $message) {
    // $file = $path.$filename;
    // $file_size = filesize($file);
    // $handle = fopen($file, "r");
    // $content = fread($handle, $file_size);
    // fclose($handle);
    // $content = chunk_split(base64_encode($content));
    // $uid = md5(uniqid(time()));
    // $name = basename($file);
    // $header = "From: ".$from_name." <".$from_mail.">\r\n";
    // $header .= "Reply-To: ".$replyto."\r\n";
    // $header .= "MIME-Version: 1.0\r\n";
    // $header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";
    // $header .= "This is a multi-part message in MIME format.\r\n";
    // $header .= "--".$uid."\r\n";
    // $header .= "Content-type:text/plain; charset=iso-8859-1\r\n";
    // $header .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    // $header .= $message."\r\n\r\n";
    // $header .= "--".$uid."\r\n";
    // $header .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n"; // use different content types here
    // $header .= "Content-Transfer-Encoding: base64\r\n";
    // $header .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
    // $header .= $content."\r\n\r\n";
    // $header .= "--".$uid."--";
    // if (mail($mailto, $subject, "", $header)) {
    //    echo "mail send ... OK"; // or use booleans here
    // } else {
    //   echo "mail send ... ERROR!";
    // }
// }
//echo '<stdClass><firstName>John</firstName><lastName>Smith</lastName><age>25</age><address><streetAddress>21 2nd Street</streetAddress><city>New York</city><state>NY</state><postalCode>10021</postalCode></address><phoneNumbers><a><type>home</type><number>212 555-1234</number></a><b><type>fax</type><number>646 555-4567</number></b></phoneNumbers></stdClass>';

}

function SerializeAsXML ($obj, $depth = 0)
    {
	$d ="";
    if (is_array($obj) || is_object($obj))
        {

        foreach ($obj as  $o_i => $o_v)
            {
			if (is_numeric($o_i)){
				$o_i = 'e';
			}
			
			$o_i = trim($o_i, "$");
			
            $d .= "<{$o_i}>";
            if (is_array($o_v) || is_object($o_v))
                {
                $d .=  SerializeAsXML($o_v, ($depth + 1));
                }
            else
                {
                $d .= $o_v;
                }

            $d .= "</{$o_i}>";
            }
        }
    return $d;
    } 
	
function sendMail($userID) {

$mail             = new PHPMailer(); // defaults to using php "mail()"

//$body             = file_get_contents('contents.html');
//$body             = preg_replace('/[\]/','',$body);
$body = "Please see the attachements";

$mail->SetFrom('chi@ahleeen.com', 'Exp Results');

//$mail->AddReplyTo("name@yourdomain.com","First Last");

$address = "nhm919@hotmail.com";
$mail->AddAddress($address, "Amur Almanji");

$address = "ameralminji@hotmail.com";
$mail->AddAddress($address, "Amur Almanji");


$mail->Subject    = "UserID: ".$userID;

$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$mail->MsgHTML($body);

$filename = "uploads/".$userID.".pdf";
if (file_exists($filename)) {
$mail->AddAttachment($filename);      // attachment
}
$mail->AddAttachment("medRep/".$userID.".xml"); // attachment

if(!$mail->Send()) {
  echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo "Message sent!";
}
}



?>