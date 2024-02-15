@echo off
cd %~dp0

start cmd /k "cd ""app"" && npm i && npm run dev"