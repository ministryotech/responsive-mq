CALL ../../set-nuget-key.bat

del *.nupkg

mkdir content
mkdir content\Scripts
copy ..\responsive-mq.js content\Scripts

nuget pack responsive-mq.nuspec
nuget push *.nupkg

pause