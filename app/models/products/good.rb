class Good < Product
  self.category = "products"
  self.pool_fields -= [:type_display]
end
