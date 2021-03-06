Vue.component('BeforeNavigation',{
    template: `
        <el-row class="tac">
            <el-col>
            <el-menu
              class="el-menus"
              background-color="#4F4F4F"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              >
              <el-menu-item index="1" disabled>
                <i class="el-icon-menu"></i>
                <span slot="title" class="showNav">导航</span>
              </el-menu-item>
              <el-menu-item  route="/signin" index="2">
                <i class="el-icon-edit"></i>
                <span slot="title" class="showNav">登陆</span>
              </el-menu-item>
              <el-menu-item route="/signup" index="3">
                <i class="el-icon-edit-outline"></i>
                <span slot="title" class="showNav">注册</span>
              </el-menu-item>
              <el-menu-item  route="/contact" index="4">
                <i class="el-icon-message"></i>
                <span slot="title" class="showNav">联系我们</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
    `
});