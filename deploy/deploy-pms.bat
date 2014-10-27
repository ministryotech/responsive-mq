@ECHO OFF

REM -- Uncomment to Init NPM first run --
REM CALL ..\..\set-npm.bat

ECHO Compiling JS...
CALL ..\ResponsiveMq\node_modules\.bin\minify ..\ResponsiveMq\responsive-mq.js

ECHO Preparing NuGet...
CALL ..\..\set-nuget-key.bat
del *.nupkg
del content\Scripts\* /Q
mkdir content
mkdir content\Scripts
copy ..\ResponsiveMq\responsive-mq.js content\Scripts
copy ..\ResponsiveMq\responsive-mq.min.js content\Scripts
pause

ECHO Publishing to NPM...
CALL npm publish ..\ResponsiveMq
pause

ECHO Publishing to NuGet...
nuget pack responsive-mq.nuspec
nuget push *.nupkg
pause