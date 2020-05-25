export default {
  state: {
	  cartList: []
  },
  mutations: {
	  ADD_CARTLIST(state, menuItem){
		  let id = menuItem.id;
		  let len = state.cartList.length;
		  if(len == 0){
			  state.cartList.push({
				  ...menuItem,
				  count: 1
			  })
		  }else{
			  let i;
			  for(i = 0; i < len; i++){
				  if(state.cartList[i].id === menuItem.id){
					  state.cartList[i].count++;
					  break;
				  }
			  }
			  if(i == len){
				  state.cartList.push({
					  ...menuItem,
					  count: 1
				  })
			  }
		  }
	  },
	  DEL_CARTLIST(state, index){
		  state.cartList.splice(index, 1)
	  }
  },
}
