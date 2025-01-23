@REM gitbook build ../ ../docs
git checkout main
git add .
git commit -m "auto deploy"
git push
echo "执行成功"