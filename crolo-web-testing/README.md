# CROLO Web Testing

## 작업 환경

```Cypress : v4.6.0 (2020_06_03 최신 : 4.7.0도 가능함을 확인)``` <br/>
```Node : v12.16.3``` <br/>
```Chrome : v8.3```


## 개발/실행 환경 구축

1. Clone repository <br/>
``` 
git clone https://github.com/seongeunso/crolo-experiment
```

2. Move cloned folder and checkout branch to ```crolo-web-testing```
```
cd .../crolo-experiment/
git checkout crolo-web-testing
cd crolo-web-testing
```

3. Install Cypress and the dependencies.
```
cd .../crolo-experiment/crolo-web-testing/
npm init -y
npm install cypress --save-dev
npm install node-xlsx --save
npm install cypress-file-upload --save
npm install yamljs --save

# Ubuntu/Debian
apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# CentOS
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib

# Chrome
https://dreamlog.tistory.com/593
```

4. For `parallel test` and `continuous integration`, <br>
    Set up a project to record

    우선 ```Test Runner``` 를 실행.
    ``` 
    cd .../crolo-experiment/crolo-web-testing/
    ./node_modules/.bin/cypress open
    ```

    ```Test Runner``` 에서 Runs를 클릭.
    ![image](https://user-images.githubusercontent.com/47529632/83621269-69c8d380-a5c9-11ea-894d-b19b25292c6e.png)

    ```Set up Project to Record``` 버튼 클릭
    ![image](https://user-images.githubusercontent.com/47529632/83621378-90870a00-a5c9-11ea-9b16-b8d82bfb6a98.png)

    

5. Run Test <br/>
    1. GUI 환경 테스팅
    ```
    cd .../crolo-experiment/crolo-web-testing/
    ./node_modules/.bin/cypress open
    ```
    이후 뜨는 창에서 각 파일을 클릭함으로써 테스팅 가능. <br/>

    ![image](https://user-images.githubusercontent.com/47529632/83598782-92d76d00-a5a5-11ea-9d1f-b67028c7defe.png)

    2. CLI 환경 테스팅
    ```
    cd .../crolo-experiment/crolo-web-testing/
    npm run cy:run
    ```
    