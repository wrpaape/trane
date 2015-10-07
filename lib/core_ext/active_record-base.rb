class ActiveRecord::Base
  before_create :set_key, :strip_newlines

  def serializable_hash(options)
    options ||= {}
    children = [:has_one, :has_many].flat_map { |assoc| self.class.reflect_on_all_associations(assoc).map(&:name) }
    ids_timestamps = self.class.column_names.grep(/_id|_at/).map(&:to_sym) << :id
    custom_options = options.merge(include: children, except: ids_timestamps)
    
    super(custom_options).compact
  end

  protected

  def set_key
    self.key = "#{self.class.to_s.underscore}-#{self.class.count}" if respond_to?(:key) && !key
  end 

  def strip_newlines
    self.class.columns.each do |col|
      if col.type == :text && col.name
        strip_outer_newlines(col.name)
        strip_single_newlines(col.name)
      end
    end
  end

  def strip_outer_newlines(text)
    self[text].strip!
  end

  def strip_single_newlines(text)
    self[text].gsub!(/(?<!\n)\n(?!\n)/, " ")
  end
end