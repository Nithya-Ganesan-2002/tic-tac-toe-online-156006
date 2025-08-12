#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-online-156006/tic_tac_toe_web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

