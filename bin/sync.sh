#!/usr/bin/env bash
set -e

cf sync cfn/user-pool-stack.yaml -y
cf sync cfn/application-resources-stack.yaml -y

npm run deploy

cf sync cfn/certificate-stack.yaml -y
cf sync cfn/dns-stack.yaml -y