<template>
  <div>

    <!-- 装饰 -->
    <div class="splash-container">
      <div class="splash">
        <h1 class="splash-head">超酷的清单任务管理器</h1>
        <p class="splash-subhead">用超酷清单管理日常工作 用更少的时间达成目标</p>
        <p>
          <a href="http://purecss.io" class="pure-button pure-button-primary">立刻开始</a>
        </p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="content-wrapper">
      <div class="content">
        <h2 class="content-head is-center">超级 Cool 的服务</h2>

        <div class="pure-g">
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">
              <i class="fa fa-rocket"></i>
              永久免费
            </h3>
            <p>超酷清单的基础功能承诺永久免费使用，不设置存储容量限制</p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">
              <i class="fa fa-mobile"></i>
              日程提醒
            </h3>
            <p>可支持设置日程短信、邮件提醒，及时掌握任务完成情况</p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">
              <i class="fa fa-th-large"></i>
              与好友共享任务
            </h3>
            <p>可将任务与合作伙伴或好友分享，一起努力完成</p>
          </div>
          <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <h3 class="content-subhead">
              <i class="fa fa-check-square-o"></i>
              云端备份数据
            </h3>
            <p>超酷清单所有数据采用云端备份，多地容灾，保证高可用和数据安全</p>
          </div>
        </div>
      </div>

      <div class="ribbon l-box-lrg pure-g">
        <div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
          <img
            width="300"
            alt="File Icons"
            class="pure-img-responsive"
            :src="iconImg"
          >
        </div>
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
          <h2 class="content-head content-head-ribbon">超酷清单可以做什么?</h2>

          <p>你可以用它来制定工作计划，记录购物清单，设置生日提醒或者用来安排日程；支持对任务的便捷增删改查。你可以用它设置每月最后一天信用卡还款，及时收到提醒。</p>
        </div>
      </div>

      <div class="content">
        <h2 class="content-head is-center">给个好评吧</h2>

        <div class="pure-g">
          <div class="l-box-lrg pure-u-1 pure-u-md-2-5">
            <form class="pure-form pure-form-stacked">
              <fieldset>
                <label for="name">你的姓名</label>
                <input id="name" type="text" placeholder="姓名">
                
                <label for="email">你的邮箱地址</label>
                <input id="email" type="email" placeholder="邮箱">
                
                <label for="password">你的留言</label>
                <!-- <input id="password" type="password" placeholder="留言"> -->
                <textarea name="comment" id="comment" cols="30" rows="10" placeholder="留言"></textarea>
                
                <button type="submit" class="pure-button">提交</button>
              </fieldset>
            </form>
          </div>

          <div class="l-box-lrg pure-u-1 pure-u-md-3-5">
            <h4>联系我们</h4>
            <p>如果您使用过程中有任何意见建议，欢迎提交留言给我们提供建议？</p>

            <h4>我们的地址</h4>
            <p>深圳市南山区万利达科技大厦</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconImg: require('./img/file-icons.png')
    }
  }
};
</script>

<style lang="stylus">
/*
 * -- 【页面】顶部装饰banner 的样式 --
 */
.splash-container {
  background: #1f8dd6;
  z-index: 1;
  overflow: hidden;
  /* The following styles are required for the "scroll-over" effect */
  width: 100%;
  height: 88%;
  top: 0;
  left: 0;
  position: fixed !important;
}

.splash {
  /* absolute center .splash within .splash-container */
  width: 80%;
  height: 50%;
  margin: auto;
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  text-transform: uppercase;
}

/* This is the main heading that appears on the blue section */
.splash-head {
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: 3px solid white;
  padding: 1em 1.6em;
  font-weight: 100;
  border-radius: 5px;
  line-height: 1em;
}

/* This is the subheading that appears on the blue section */
.splash-subhead {
  color: white;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

/*
 * -- 【页面】内容区域样式 --
 * This represents the content area (everything below the blue section)
 */
.content-wrapper {
  /* These styles are required for the "scroll-over" effect */
  position: absolute;
  top: 87%;
  width: 100%;
  min-height: 12%;
  z-index: 2;
  background: white;
}

/* We want to give the content area some more padding */
.content {
  padding: 1em 1em 3em;
}

/* This is the class used for the main content headers (<h2>) */
.content-head {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 2em 0 1em;
}

/* This is a modifier class used when the content-head is inside a ribbon */
.content-head-ribbon {
  color: white;
}

/* This is the class used for the content sub-headers (<h3>) */
.content-subhead {
  color: #1f8dd6;
}

.content-subhead i {
  margin-right: 7px;
}

/* This is the class used for the dark-background areas. */
.ribbon {
  background: #2d3e50;
  color: #aaa;
}

/*
 * -- TABLET (AND UP) MEDIA QUERIES --
 * On tablets and other medium-sized devices, we want to customize some
 * of the mobile styles.
 */
@media (min-width: 48em) {
  /* We increase the height of the splash-container */
  /* .splash-container {
      height: 500px;
  } */
  /* We decrease the width of the .splash, since we have more width
  to work with */
  .splash {
    width: 50%;
    height: 50%;
  }

  .splash-head {
    font-size: 250%;
  }

  /* We remove the border-separator assigned to .l-box-lrg */
  .l-box-lrg {
    border: none;
  }
}

/*
 * -- DESKTOP (AND UP) MEDIA QUERIES --
 * On desktops and other large devices, we want to over-ride some
 * of the mobile and tablet styles.
 */
@media (min-width: 78em) {
  /* We increase the header font size even more */
  .splash-head {
    font-size: 300%;
  }
}
</style>

