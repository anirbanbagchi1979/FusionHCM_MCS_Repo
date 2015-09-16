#!/bin/bash

## Check Git
ensure_git(){
  if  command -v git -v >/dev/null 2>&1
    then
      echo "Check for Git ... [OK]" ;
    else
      echo "Check for Git ... [ERR]" ;
      echo "Could not find Git binaries on PATH. Please install them / add them to PATH";
      echo "Current PATH is : "
      echo $PATH;
      return 1;
  fi
}

ensure_Mongo(){
  let ensure_Mongo++
  if  command -v mongod >/dev/null 2>&1
    then
      echo "Check for MongoDB ... [OK]" ;

    else
      echo "Check for  MongoDB ... [ERR]" ;
      echo "Could not find Mongo binaries on PATH. Trying to install them.";
      if [ $ensure_Mongo -lt 2 ]
        then
          install_mongoDB
          ensure_Mongo
        else
          echo "MongoDB instalation failed. Please install manually and rerun script."
          return 1
      fi
  fi

}
install_mongoDB(){
  ensure_homeBrew
  brew update
  brew install mongodb

}

ensure_node() {

  let ensure_node++
  if  command -v node >/dev/null 2>&1
    then
      echo "Check for Node.js ... [OK]" ;

    else
      echo "Check for  Node.js ... [ERR]" ;
      echo "Could not find node binaries on PATH. Trying to install them.";
      if [ $ensure_node -lt 2 ]
        then
          install_nodeJS
          ensure_node
        else
          echo "NodeJS instalation failed. Please install manually and rerun script."
          return 1
      fi
  fi

}

install_nodeJS(){
if uname -a |grep NT 2>&1
  then
    echo "Installing Node for Windows"
    cd scripts
    msiexec -i node-v0.12.5-x64.msi -passive
  else  
    # check homebrew
    ensure_homeBrew
    brew update
    brew install node
fi
}

ensure_homeBrew(){
  let ensure_homebrew++
  if  command -v brew -v >/dev/null 2>&1
    then
      echo "Check for HomeBrew ... [OK]" ;

    else
      echo "Check for  HomeBrew ... [ERR]" ;
      echo "Could not find brew binaries on PATH. Trying to install them.";
      if [ $ensure_homebrew -lt 2 ]
        then
          install_homeBrew
          ensure_homeBrew
        else
          echo "HomeBrew instalation failed. Please install manually and rerun script."
          return 1
      fi
  fi


}

install_homeBrew(){
  ensure_ruby
  if [ `uname -s` == 'Darwin' ]
     then
      ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  elif [ `uname -s` == 'Linux' ]
     then
      ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
      export PATH=$PATH:~/.linuxbrew/bin;
  fi

}

ensure_sass(){
  let ensure_sass++
  if  command -v sass -v >/dev/null 2>&1
    then
      echo "Check for Sass ... [OK]" ;

    else
      echo "Check for  Sass ... [ERR]" ;
      echo "Could not find Sass binaries on PATH. Trying to install them.";
      if [ $ensure_sass -lt 2 ]
        then
          install_sass
          ensure_sass
        else
          echo "Sass instalation failed. Please install manually and rerun script."
          return 1

      fi
  fi

}

install_sass(){

  ensure_ruby
  if [ `uname -s` == 'Darwin' ]
   then
     sudo gem install sass
   elif [ `uname -s` == 'Linux' ]
      then
      sudo su -c "gem install sass"
  fi

}

ensure_ruby(){
  let ensure_ruby++
  if  command -v ruby -v >/dev/null 2>&1
    then
      echo "Check for Ruby ... [OK]" ;

    else
      echo "Check for  Ruby ... [ERR]" ;
      echo "Could not find ruby binaries on PATH. Trying to install them.";
      if [ $ensure_ruby -lt 2 ]
        then
          install_ruby
          ensure_ruby
        else
          echo "Ruby instalation failed. Please install manually and rerun script."
          return 1
      fi
  fi
}

install_ruby(){
  ensure_apt
  if [ `uname -s` == 'Darwin' ]
     then
      echo "This seems to be a Mac with no ruby on it. Very strange !";
      echo "You need to get ruby installed on this, and rerun the script. sorry!"
      return 1;
  elif [ `uname -s` == 'Linux' ]
     then
      echo "Linux box with no ruby. Trying to install it.";
      echo "You need admin privs now. I'll try sudo, home you are on the sudoers list ! (If you are not, then you need to be on it) "
      echo "Attempting Ruby install"
      sudo apt-get install ruby;
  fi

}

ensure_apt(){
  if  command -v apt -v >/dev/null 2>&1
     then
       echo "Check for package manager ... [OK]" ;

     else
       echo "Check for  apt ... [ERR]" ;
       echo "This script works only on Debian based distros that use apt and the dselect system (or on a mac). You dont seem to be running one. Please install ruby manually (like using yum if thats what your distro does) and try running thiscript again";
       echo "Current PATH is : "
       echo $PATH;
       return 1;
   fi
}

ensure_node_globals(){
  let ensure_node_globals++
  #echo "::::::: $ensure_node_globals"
  if [ -f node_module_installer.sh ]
    then
      rm -f node_module_installer.sh
  fi

  if  npm list -g --depth=0|grep express >/dev/null 2>&1
    then
      echo "Check for Express (global) ... [OK]" ;

    elif [ $ensure_node_globals -lt 2 ]
        then
            echo "Check for Express (global) ... [Will Try]" ;

            echo "npm install -g express" >> node_module_installer.sh;
    else
      echo "Check for Express (global) ... [Failed]" ;

  fi

  if  npm list -g --depth=0|grep express-generator >/dev/null 2>&1
    then
      echo "Check for Express-Generator (global) ... [OK]" ;

    elif [ $ensure_node_globals -lt 2 ]
        then
      echo "Check for Express-Generator (global) ... [Will Try]" ;
      echo "npm install -g express-generator" >> node_module_installer.sh;
    else
      echo "Check for Express-Generator (global) ... [Failed]" ;

  fi

  if  npm list -g --depth=0|grep forever >/dev/null 2>&1
    then
      echo "Check for Forever (global) ... [OK]" ;
    elif [ $ensure_node_globals -lt 2 ]
        then
        echo "Check for Forever (global) ... [Will Try]" ;
        echo "npm install -g forever" >> node_module_installer.sh;
    else
      echo "Check for Forever (global) ... [Failed]" ;

  fi

  if  npm list -g --depth=0|grep bower >/dev/null 2>&1
    then
      echo "Check for Bower (global) ... [OK]" ;
    elif [ $ensure_node_globals -lt 2 ]
        then
        echo "Check for Bower (global) ... [Will Try]" ;
        echo "npm install -g bower" >> node_module_installer.sh;
    else
      echo "Check for Bower (global) ... [Failed]" ;
  fi

  if  npm list -g --depth=0|grep gulp >/dev/null 2>&1
    then
      echo "Check for Gulp (global) ... [OK]" ;
    elif [ $ensure_node_globals -lt 2 ]
        then
        echo "Check for Gulp (global) ... [Will Try]" ;
        echo "npm install -g gulp" >> node_module_installer.sh;
    else
      echo "Check for Gulp (global) ... [Failed]" ;

  fi
  if uname -a|grep Darwin 2>&1
   then
    if  npm list -g --depth=0|grep ios-sim >/dev/null 2>&1
      then
        echo "Check for iOS-Sim (global) ... [OK]" ;
      elif [ $ensure_node_globals -lt 2 ]
          then
          echo "Check for iOS-Sim (global) ... [Will Try]" ;
          echo "npm install -g ios-sim" >> node_module_installer.sh;
      else
        echo "Check for iOS-Sim (global) ... [Failed]" ;

    fi
  fi

  if  npm list -g --depth=0|grep ionic >/dev/null 2>&1
    then
      echo "Check for ionic (global) ... [OK]" ;
    elif [ $ensure_node_globals -lt 2 ]
        then
        echo "Check for ionic (global) ... [Will Try]" ;
        echo "npm install -g ionic" >> node_module_installer.sh;
    else
      echo "Check for ionic (global) ... [Failed]" ;

  fi

  if  npm list -g --depth=0|grep cordova >/dev/null 2>&1
    then
      echo "Check for Cordova (global) ... [OK]" ;
    elif [ $ensure_node_globals -lt 2 ]
        then
        echo "Check for Cordova (global) ... [Will Try]" ;
        echo "npm install -g cordova" >> node_module_installer.sh;
    else
      echo "Check for cordova (global) ... [Failed]" ;
  fi

  if [ $ensure_node_globals -eq 1 ]
    then
      install_node_globals
      ensure_node_globals
  fi

}

install_node_globals(){

  if [ -f node_module_installer.sh ]
    then
      chmod +x node_module_installer.sh
      ./node_module_installer.sh
  fi


}


clean_up_scriptGen(){
  rm -rf node_module_installer.sh

}

ensure_appDependencies(){
  let install_attempted++
  npm install
  bower install
}

setup_cordova(){
  let cordova_attempted++
  if  npm list -g --depth=0|grep cordova >/dev/null 2>&1
    then
      echo "Adding the cordova ios and android platforms"
      cordova platform add ios
      cordova platform add android
    else
      echo "Cordova not found ... [Will install]"
      if [$cordova_attempted -lt 2]
        then
          ensure_node_globals
          setup_cordova
        else
          echo "Cordova installation failed. Please install Cordova manually adn re-run script"
      fi
  fi

}

start_mongodb(){
  echo "Starting MongoDB"
  if [ -d mongo_files ]
    then
      rm -rf mongo_files
  fi
  mkdir mongo_files;
  mkdir mongo_files/appstoredata;
  mkdir mongo_files/logs;
  mongod --fork --dbpath mongo_files/appstoredata --logpath mongo_files/logs/mongodb.log
  sleep 5;
  pgrep mongod >/dev/null 2>&1 && echo "MongoDB Started" || echo "Something went bad... really bad. Check the mongodb logs for clues."
}

stop_mongodb(){
  # less than ideal, but no side effects and works for older mongo releases
  kill `pgrep mongod`
}

appstore_up(){
  cd ateamappstore
  forever start bin/www
  cd -
}

appstore_down(){
  # actually stops everything. need to refine - 1st draft
  forever stopall
}
