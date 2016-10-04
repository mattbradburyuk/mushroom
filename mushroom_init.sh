#!/usr/bin/env bash

# Script to install a new Mushroom project

echo ""
echo "Checking source and target Directories"


# Check that script is run from the folder called mushroom

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


# Check that referencing flag is present

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

# check if $TARGET_DIR exists already

if [ -d "$TARGET_DIR" ]; then
    echo ' ----> Directory already exists'
    exit
fi


# Copy template files to new folder

echo ''
echo 'Copying Mushroom template to new project folder...'

mkdir $TARGET_DIR
cp -iR $SOURCE_DIR/.  $TARGET_DIR         #i: prompt for overwriting files, R: recursive

echo " ---> Done"

# Installing node dependencies with npm

echo ""
echo "Installing node dependencies"
echo ""
cd $TARGET_DIR
npm install


# Finished message

echo ''
echo "All done... To see commands type 'node mushroom.js' in the new project root"
echo ""
echo "Feedback/Issues to: https://github.com/mattbradburyuk/mushroom"