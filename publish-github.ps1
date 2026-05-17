# Publish dviewer-website to https://github.com/luhaibo/dviwerpage
# Run in PowerShell, for example:
#   cd D:\code\LuXOne\rust-cbct\dviewer-website
#   .\publish-github.ps1

$ErrorActionPreference = "Stop"

$Remote = "https://github.com/luhaibo/dviwerpage.git"
$SourceRoot = $PSScriptRoot
$WorkDir = Join-Path $env:TEMP ("dviwerpage-publish-" + [Guid]::NewGuid().ToString("N"))
$Prev = Get-Location

Write-Host "Source: $SourceRoot"
Write-Host "Temp:   $WorkDir"

try {
    git clone --depth 1 $Remote $WorkDir
    Get-ChildItem -LiteralPath $WorkDir -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force
    Copy-Item -Path (Join-Path $SourceRoot "*") -Destination $WorkDir -Recurse -Force

    Set-Location $WorkDir
    git add -A
    $pending = git status --porcelain
    if ($pending) {
        git commit -m "Update DViewer static site"
    } else {
        Write-Host "No file changes to commit."
    }
    git push origin HEAD
    Write-Host "Done. Repository: https://github.com/luhaibo/dviwerpage"
}
finally {
    Set-Location $Prev
    if (Test-Path $WorkDir) {
        Remove-Item -Recurse -Force $WorkDir
    }
}
