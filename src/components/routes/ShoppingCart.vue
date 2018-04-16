<template>
  <div class="_cart">
    <h1 class="_cart-title">
      Carrinho
      <small>2 itens</small>
    </h1>
    <div class="_cart-content">
      <el-row :gutter="20">
        <el-col :span="18" class="_items">
          <div class="_item">
            <el-row :gutter="15">
              <el-col :span="4" class="_item-image">
                <img src="https://cea.vteximg.com.br/arquivos/ids/2692924-200-240/Polo-Masculina-em-Piquet-Listrada-Manga-Curta-Azul-Marinho-9115127-Azul_Marinho_1.jpg?v=636578442433670000" />
              </el-col>
              <el-col :span="20" class="_item-info">
                <el-row type="flex" align="middle" justify="space-between">
                  <div class="_item-values">
                    <span class="_item-quantity">
                      <el-input-number :min="1" :max="10" size="small"></el-input-number>
                    </span>
                    <span class="_item-remove">
                      <el-button type="danger" size="small">
                        <a-icon icon="times"></a-icon>
                      </el-button>
                    </span>
                    <span class="_item-price">
                      R$ 59,00
                    </span>
                  </div>
                  <div class="_item-total">
                    R$ 59,00
                  </div>
                </el-row>
                <h4 class="_item-title">Produto</h4>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" class="_cart-total">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: mapGetters([
    'cart'
  ])
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';

._item,
._cart-total {
  padding-top: $--card-padding;
  border-top: $--border-width-base $--border-style-base $--border-color-extra-light;
}
._item-image > img {
  border-radius: $--border-radius-small;
  border: $--border-base;
}
._item-info {
  font-size: $--font-size-large;
}
._item-values > * {
  display: inline-block;
}
._item-price {
  color: $--color-text-secondary;
  margin-left: 20px;
}
._item-total {
  color: $--color-text-primary;
  text-align: right;
  margin: -4px 0 0 10px;
}
._item-remove {
  margin-left: 10px;
}
</style>
