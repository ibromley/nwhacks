#!/usr/bin/env bash

rm -f data.db
sqlite3 data.db < sql-import.sql