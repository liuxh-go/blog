#!/bin/sh

read -p "input commit comment:" comment
git add .
git commit -m "$comment"
git push

# 合并develop到master分支且推送到远端
git checkout master
git merge develop
git push

git checkout develop