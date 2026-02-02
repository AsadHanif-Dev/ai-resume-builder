# After creating the repo on GitHub, replace YOUR_GITHUB_USERNAME with your actual username
# Then run this script

$repoUrl = "https://github.com/AsadHanif-Dev/ai-resume-builder.git"

Write-Host "Adding remote origin..." -ForegroundColor Cyan
git remote add origin $repoUrl

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin master

Write-Host "Done! Your code is now on GitHub." -ForegroundColor Green
