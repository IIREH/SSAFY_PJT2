README



#### Git 브랜치 전략

- Local에서 본인의 이름의 브랜치를 생성
  - ex) git branch hanbin
- master 브랜치에서 본인이 생성한 브랜치로 전환
  - ex) git checkout hanbin
- 브랜치 안에서 작업을 완료
- 본인의 브랜치 작업물을 master 브랜치에 merge
  - git add .
  - git commit -m "날짜 기능명-작업종류 [간단한 작업내용]"
    - ex) git commit -m "0317 signup-update [service modify]"
  - git push origin 본인 브랜치명
    - ex) git push origin hanbin
- Gitlab Repo로 이동한 후 create merge request를 해서 merge 요청
- merge 승인 후 Local에서 master 브랜치로 전환
  - ex) git checkout master
- master 브랜치에서 pull
  - ex) git pull origin master
- master 브랜치 pull에 되었는지 확인한 후 Local에서 작업한 본인 브랜치 삭제
  - git branch -D 본인 브랜치명
    - ex) git branch -D hanbin
- 다시 본인의 이름으로 브랜치 생성한 후 작업