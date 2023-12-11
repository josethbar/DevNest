class JwtDenylist < ApplicationRecord
    include Devise::JWT::RevocationStrategies::Denylist
    self.table_name = 'jwt_denylist'
end

#   include Devise::JWT::RevocationStrategies::Denylist
#   self.table_name = 'jwt_denylist'