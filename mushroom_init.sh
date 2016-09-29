#!/usr/bin/env bash

#plan
#
#1) check script started in mushroom directory - would this work if
#2) case on arg 1 -r, -a, blank/something else
#3) check arg 2 is a directory
#4) check arg 2 is not current directory


# check that script is run from the folder called mushroom

DIR_NAME=${PWD##*/}
if [ $DIR_NAME != "mushroom" ];
    then echo 'not in mushroom folder please run script from mushroom folder'
    exit
fi

echo 'through if'

echo arg 0: $0
echo arg 1: $1
echo arg 2: $2

case $1 in
    -r) echo "Using relative referencing from mushroom folder to new project folder"
        TARGET_DIR=$PWD'/'$2;;
    -a) echo "Using absolute referencing to project folder"
        TARGET_DIR=$2;;
     *) echo '***** add usage instructions ******'
        exit;;
esac

case $2 in
    '') echo 'Path to new project directory (arg 2) is blank, cannot use mushroom director, it would get messy'
        exit;;

    .) echo 'Cannot use mushroom directory, it would get messy'
       exit;;
esac

echo 'through second case'



echo TARGET_DIRECTORY: $TARGET_DIR

MUSHROOM_DIRECTORY=$PWD
echo MUSHROOM_DIRECTORY: $MUSHROOM_DIRECTORY



#echo 'setting up clean mushroom folder...'

#echo $1
#mkdir $1
#cd $1
#
#mkdir .mushroom
#cp -R /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/.mushroom/ ./.mushroom
#cp /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/.mushroom_config.js .
#cp /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/mushroom.js .
#cp /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/package.json .
#cp /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/.gitignore .
#
#
#mkdir config
#
#cp -R /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/config/ ./config
#
#mkdir sources
#
#cp -R /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/sources/ ./sources
#
#mkdir output
#
#cp -R /Users/matthewbradbury/Dropbox/development/Dapps/mushroom/output/ ./output
#
#
#npm install