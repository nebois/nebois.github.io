gitbook build ./ ./docs

git add .
git commit -m "auto depoly"
git push

echo "auto deploy done!"