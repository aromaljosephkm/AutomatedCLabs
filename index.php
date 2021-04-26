<?php
ini_set('display_errors', 'on');
ob_start();
session_start();
if (isset($_SESSION['login'])) {
		header('Location:/lab/');
		exit;
}
?>
<!DOCTYPE HTML>
<html>
  <head>
	  <title>Title</title>
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <meta charset="UTF-8" />
	  <link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
	  <link href="css/font-awesome.min.css" rel="stylesheet">
	  <link href="http://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext" rel="stylesheet">
	  <style>
		.glow {
  			color: #fff;
  			text-align: center;
  			animation: glow 10s ease-in-out infinite alternate;
		}

		@keyframes glow {
  			from {
    			text-shadow: 0 0 5px #00ad45, 0 0 10px #00ad45, 0 0 15px #00ad45, 0 0 20px #00ad45, 0 0 25px #00ad45, 0 0 30px #00ad45, 0 0 35px #00ad45;
  			}
  			to {
    			text-shadow: 0 0 10px #00ad45, 0 0 15px #00ad45, 0 0 20px #00ad45, 0 0 25px #00ad45, 0 0 30px #00ad45, 0 0 35px #00ad45, 0 0 40px #00ad45;
  			}
		}
	   </style>
  </head>
  <body>
	  <div class="main-bg">
		  <h1 class="glow">Vjec <br>Programming in C<br>Automated Lab</h1>
		  <div class="sub-main-w3">
			  <div class="vertical-tab">
				  <div id="section1" class="section-w3ls">
					  <input type="radio" name="sections" id="option1" checked>
					  <article>
						  <form action="login.php" method="post">
							  <h3 class="legend">Student Login</h3>
							  <div class="input">
								  <span class="fa fa-envelope-o" aria-hidden="true"></span>
								  <input type="text" placeholder="Register Number" name="regno" required />
							  </div>
							  <div class="input">
								  <span class="fa fa-key" aria-hidden="true"></span>
								  <input type="password" placeholder="Password" name="password" required />
							  </div>
							  <button type="submit" class="btn submit">Login</button>
							  <a href="#" class="bottom-text-w3ls">Forgot Password? Contact your Faculty</a>
						  </form>
					  </article>
				  </div>
			  </div>
		  </div>
    </div>  
  </body>
</html>