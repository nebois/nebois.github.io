gitbook build ./ ./docs

git add .
git commit -m "auto depoly"
git push

echo "部署完成"