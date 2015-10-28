class Product < ActiveRecord::Base
  include AddPath, HasAllAssets, Searchable, HasTypeDisplay, HasCategory

  has_many :documents, as: :parent

  alias_attribute :display, :name

  self.category = "products_and_modifications"
  self.pool_fields = [:name, :type_display, :info]
end
