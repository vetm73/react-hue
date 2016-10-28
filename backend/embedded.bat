@ECHO OFF
set COMMAND=%1

if "%COMMAND%" == "npm" (
    ..\node\npm %2 %3 %4 %5 %6 %7 %8 %9
) else if "%COMMAND%" == "gulp" (
     ..\node\node.exe "node_modules\gulp\bin\gulp.js" %2 %3 %4 %5 %6 %7 %8 %9
) else (
    echo "No command %COMMAND%"
)
