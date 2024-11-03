docker build -t taikula .
@REM docker rm -f taikula
@REM docker run -p 3003:3000 -e OPENAI_API_BASE=https://hub2.one/v1 -e OPENAI_API_KEY=sk-9v1Z8EFED5113HTq82B8B20dEc2f4bD5Ad6110Ae8625Ef91 -e TIANAPI_KEY=d23ec9d352ae41edd8f7c796bb3983ed -e TAVILY_API_KEY=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 -e USE_LOCAL_REDIS=true -e LOCAL_REDIS_URL=redis://redis:6379 --link redis --name taikula taikula

REM 获取当前日期和时间
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set "tag=%datetime:~0,8%-%datetime:~8,6%"

echo %tag%

docker tag taikula uswccr.ccs.tencentyun.com/dapengkeji/taikula:%tag%
docker push uswccr.ccs.tencentyun.com/dapengkeji/taikula:%tag%
