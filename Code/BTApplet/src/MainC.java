import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Point2D;


public class MainC implements Character{
	private double x;
	private double y;
	private double dx = -.3;
	private double dy = .2;
	private Color color;
	private double radius;
	private Shape shape;
	private boolean invincible;
	private double diameter;
	
	
	public MainC(int height){
		this.x = height/2;
		this.y = height/2;
		this.color = Color.BLUE;
		this.radius = 40;
		this.diameter = 2*this.radius;
		this.shape = new Ellipse2D.Double(this.x,this.y,this.diameter,this.diameter);
		this.invincible = false;
	}
	
	public void changeInvincibilityStatus(){
		this.invincible = !this.invincible;
	}
	
	@Override
	public void changeColor() {
		if(this.invincible){
			
		}else{
			
		}
		
	}

	@Override
	public void timePassed() {
		// TODO Auto-generated method stub
		//System.out.println("Got here");
		this.move();
	}

	@Override
	public void move() {
		// TODO Auto-generated method stub
		this.x += this.dx;
		this.y += this.dy;
		if(this.x<0 || (this.x+(1.5*this.radius))>800){
			this.dx*=-1;
		}
		if((this.y<0) || (this.y+(2*this.radius))>800){
			this.dy*=-1;
		}
		this.shape = new Ellipse2D.Double(this.x,this.y,this.radius,this.radius);
	}

	@Override
	public Shape getShape() {
		// TODO Auto-generated method stub
		return this.shape;
	}

	@Override
	public Color getColor() {
		// TODO Auto-generated method stub
		return this.color;
	}
	@Override
	public Point2D getPoint() {
		// TODO Auto-generated method stub
		return new Point2D.Double(this.x+this.radius,this.y+this.radius);
	}

	@Override
	public int getRadius() {
		// TODO Auto-generated method stub
		return (int) (this.radius/2);
	}
	
	public void collideWithLine(Line line){
			double slope = line.slope();
			Point2D p1 = line.getPointOne();
			Point2D p2 = line.getPointTwo();
		
	}

}
