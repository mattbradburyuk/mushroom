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
    then echo ' ---> Not in mushroom folder please run script from mushroom folder'
    exit
fi

# check that the mushroom_template_files directory is present

if [ `find . -maxdepth 1 -type d| grep mushroom_template_files` = './mushroom_template_files' ]; then
        echo " ---> mushroom_template_files directory found"
    else
        echo echo " ---> current folder doesn't contain mushroom_template_files directory"
        exit
fi


# Set SOURCE_DIR for template files

SOURCE_DIR=$PWD/mushroom_template_files
echo  ' ---> Source directory: ' $SOURCE_DIR


# check number of args > 3

if [ "$#" -gt 2 ];
    then echo ' ---> Expecting only three arguments: $ mushroom_init <flag> <new project name and path> '
    exit
fi


# check that referencing flag is present

case $1 in
    -r) echo " ---> Using relative referencing from mushroom folder to new project folder"
        TARGET_DIR=$PWD'/'$2;;
    -a) echo " ---> Using absolute referencing to project folder"
        TARGET_DIR=$2;;
     *) echo '***** add usage instructions ******'
        exit;;
esac



case $2 in
    '') echo ' ---> Path to new project directory (arg 2) is blank, cannot use mushroom directory, it would get messy'
        exit;;

    .) echo ' ---> Cannot use mushroom directory, it would get messy'
       exit;;
esac



echo ' ---> Target directory: ' $TARGET_DIR




echo ''
echo 'setting up clean mushroom folder...'

mkdir $TARGET_DIR

cp -R $SOURCE_DIR $TARGET_DIR

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