class Modification < Prod
  self.pool_fields -= [:type_display]
  set_attrs("modifications")
end